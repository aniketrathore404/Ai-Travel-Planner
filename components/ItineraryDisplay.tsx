import React from 'react';

const formatLine = (line: string): string => {
  const markdownLinkRegex = /\[(.*?)\]\((.*?)\)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;
  return line
    .replace(boldRegex, '<strong class="text-sky-900 font-semibold">$1</strong>')
    .replace(markdownLinkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sky-600 font-bold hover:text-sky-400 hover:underline transition-all bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">$1</a>');
};

const ItineraryCard: React.FC<{ cardContent: string }> = ({ cardContent }) => {
  const lines = cardContent.trim().split('\n').filter(line => line.trim() !== '');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      const isSpecialSection = cardContent.includes('**Ways to Reach') || 
                               cardContent.includes('**Where to Stay') || 
                               cardContent.includes('**Booking & Reservation');
                               
      const listClassName = isSpecialSection
        ? "list-none space-y-4 mb-4 pl-1 text-slate-700"
        : "list-none space-y-2 mb-4 pl-4 text-slate-700";
        
      const listItemClassName = isSpecialSection
        ? "bg-white/60 p-5 rounded-2xl border border-sky-100 shadow-sm transition-all hover:shadow-md hover:border-sky-300 group"
        : "relative before:content-['•'] before:absolute before:left-[-1em] before:text-sky-500";
        
      elements.push(
        <ul key={`ul-${elements.length}`} className={listClassName}>
          {listItems.map((item, index) => (
            <li key={index} className={listItemClassName} dangerouslySetInnerHTML={{ __html: formatLine(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('- ')) {
      listItems.push(trimmedLine.substring(2));
    } else {
      flushList();
      // Match Section Headers
      if (trimmedLine.match(/^(🌐|🏨|📅|✅) \*\*/)) {
        elements.push(<h2 key={index} className="text-3xl font-bold text-sky-900 mt-4 mb-8 border-b-2 border-sky-200 pb-4" dangerouslySetInnerHTML={{ __html: formatLine(trimmedLine) }} />);
      } 
      // Match Transport/Daily/Hotel Subheaders
      else if (trimmedLine.match(/^(✈️|🚆|🚌|🚗|🚕|🌍|🍴|🛌|🛏️|🏩) \*\*/)) {
        elements.push(<h3 key={index} className="text-2xl font-semibold text-sky-800 mt-10 mb-5 flex items-center gap-2" dangerouslySetInnerHTML={{ __html: formatLine(trimmedLine) }} />);
      } 
      // Plain text
      else if (trimmedLine) {
        elements.push(<p key={index} className="text-slate-700 mb-4 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: formatLine(trimmedLine) }} />);
      }
    }
  });

  flushList();

  return (
    <div className="ui-card p-8 sm:p-12 rounded-[2rem] mb-12 prose prose-lg max-w-none prose-p:text-slate-700 shadow-2xl border border-white/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-sky-500 via-teal-400 to-sky-500 opacity-40"></div>
      {elements}
    </div>
  );
};


interface ItineraryDisplayProps {
  content: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ content }) => {
  const itineraryCards = content
    .split('──────────────────────────')
    .map(card => card.trim())
    .filter(card => card.length > 0);

  return (
    <div className="animate-fade-in space-y-10 mt-6">
      {itineraryCards.map((cardContent, index) => (
        <ItineraryCard key={index} cardContent={cardContent} />
      ))}
    </div>
  );
};

export default ItineraryDisplay;