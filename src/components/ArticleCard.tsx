import React from 'react';

interface ArticleProps {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  category: string;
  publishedAt: string | Date;
  url: string;
}

const truncateDescription = (description: string, maxLength: number = 120) => {
  return description.length > maxLength
    ? description.slice(0, maxLength) + '...'
    : description;
};

const ArticleCard: React.FC<ArticleProps> = ({
  title,
  author,
  description,
  imageUrl,
  category,
  publishedAt,
  url,
}) => {
  return (
    <div key={title} className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-sm text-gray-600 mt-2">
          <span className="inline-block mt-2 px-2 mr-2 text-sm font-semibold text-white bg-blue-500 ">
            {category}{' '}
          </span>
          {author} - {new Date(publishedAt).toLocaleDateString()}
        </p>

        <p className="mt-2 text-gray-800">{truncateDescription(description)}</p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
