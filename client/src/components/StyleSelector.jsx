import { useApp } from '../context/AppContext';

const styles = [
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional business headshot with neutral background and professional attire emphasis',
    icon: '👔',
    color: 'blue',
  },
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'Modern, approachable look with subtle creative elements',
    icon: '🎨',
    color: 'purple',
  },
  {
    id: 'executive-portrait',
    name: 'Executive Portrait',
    description: 'High-end, polished executive presence with premium lighting',
    icon: '💼',
    color: 'gray',
  },
  {
    id: 'creative-social',
    name: 'Authentically Creative Social Media',
    description: 'Vibrant, personality-driven style optimized for social platforms',
    icon: '✨',
    color: 'pink',
  },
];

const StyleSelector = ({ onStyleSelect }) => {
  const { selectedStyle, setSelectedStyle } = useApp();

  const handleStyleClick = (style) => {
    setSelectedStyle(style);
    if (onStyleSelect) {
      onStyleSelect(style);
    }
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300',
      purple: isSelected
        ? 'border-purple-500 bg-purple-50'
        : 'border-gray-200 hover:border-purple-300',
      gray: isSelected
        ? 'border-gray-700 bg-gray-50'
        : 'border-gray-200 hover:border-gray-400',
      pink: isSelected
        ? 'border-pink-500 bg-pink-50'
        : 'border-gray-200 hover:border-pink-300',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Professional Style
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styles.map((style) => {
          const isSelected = selectedStyle?.id === style.id;
          return (
            <div
              key={style.id}
              onClick={() => handleStyleClick(style)}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${getColorClasses(
                style.color,
                isSelected
              )} ${isSelected ? 'shadow-lg transform scale-105' : 'shadow hover:shadow-md'}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="text-4xl">{style.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {style.name}
                  </h3>
                  <p className="text-sm text-gray-600">{style.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
