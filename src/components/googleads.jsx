import AdSense from 'react-adsense';

const googleads = () => {
  return (
    <div>
      <AdSense.Google
        client='ca-pub-8829050321080651'
        slot='9340052361'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
      />
    </div>
  );
};

export default googleads;
