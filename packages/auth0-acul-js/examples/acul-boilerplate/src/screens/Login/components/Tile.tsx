interface TitleProps {
    screenTexts: {
      title?: string;
      description?: string;
    };
  }
  
  export const Title: React.FC<TitleProps> = ({ screenTexts }) => (
    <div className="title-container">
      <h1>{screenTexts?.title}</h1>
      <p>{screenTexts?.description}</p>
    </div>
  ); 