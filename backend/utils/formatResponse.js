export const formatResponse = (response) => {
  const content = response.message.content;

  let formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

    let paragraphs = formattedContent.split('\n\n');
    formattedContent = "";

    paragraphs.forEach(paragraph => {
        if (paragraph.match(/^\d+\./)) {
          // Numbered lists
          formattedContent += `<ol>`;
          const items = paragraph.split(/\d+\.\s/).filter(Boolean);
          items.forEach(item => formattedContent += `<li>${item.trim()}</li>`);
          formattedContent += `</ol>`;
        } else if (paragraph.match(/^\*\s/)) {
          // Bullet points
          formattedContent += `<ul>`;
          const items = paragraph.split(/\*\s/).filter(Boolean);
          items.forEach(item => formattedContent += `<li>${item.trim()}</li>`);
          formattedContent += `</ul>`;
        } else {
          // Regular paragraphs
          formattedContent += `<p>${paragraph.trim()}</p>`;
        };
    });

    return formattedContent;

};
