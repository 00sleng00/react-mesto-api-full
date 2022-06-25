import React from 'react';

function Footer() {
  const [date, setDate] = React.useState('');
  const getYear = () => setDate(new Date().getFullYear())
  React.useEffect(() => {
    getYear();
  }, [])

  return (
    <footer className="footer">
      <p className="footer__copyright">©{date} Mesto Russia</p>
    </footer>
  );
}

export default Footer;