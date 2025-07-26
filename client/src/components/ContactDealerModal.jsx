import '../style/ContactDealerModel.css';

const ContactDealerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Modal close state

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Inquiry sent to dealer! (Backend integration coming soon)');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Contact Dealer</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Phone Number" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit" className="submit-btn">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
};

export default ContactDealerModal;
