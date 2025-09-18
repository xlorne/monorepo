import React from 'react';

export interface ButtonAction {
    getLabel: () => string;
}

export interface ButtonProps{
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
    actionRef?: React.Ref<ButtonAction>;
}