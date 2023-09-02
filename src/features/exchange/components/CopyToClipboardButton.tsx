type CopyToClipboardButtonProps = {
  data: string | number;
  buttonText?: string;
};

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ data, buttonText = 'Copy' }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.toString())
      .then(() => {
        console.log('Data copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <button className="e-copy-button" onClick={handleCopyClick}>
      {buttonText}
    </button>
  );
}

export default CopyToClipboardButton;
