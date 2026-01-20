import React from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    padding = 'md',
    interactive = false,
    style
}) => {
    const paddingClass = padding !== 'none' ? styles[`padding-${padding}`] : '';
    const interactiveClass = interactive ? styles.interactive : '';

    return (
        <div className={`${styles.card} ${paddingClass} ${interactiveClass} ${className}`} style={style}>
            {children}
        </div>
    );
};
