import React from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Notification</h2>
                <p className="modal-message">{message}</p>
                <button className="modal-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

