import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
        >
            {/* Background Overlay */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(4px)'
                }}
                onClick={onClose} 
            />
            
            {/* Modal Content */}
            <div
                className="relative bg-[#010a13] border border-[#c8aa6e] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
                style={{ width: 'min(95vw, 600px)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#c8aa6e]/30 bg-[#0a1428]">
                    <h2 className="text-[#c8aa6e] font-bold text-lg uppercase tracking-widest drop-shadow-sm">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-[#5c5b57] hover:text-[#c8aa6e] transition-colors p-1"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar bg-[#010a13]">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
