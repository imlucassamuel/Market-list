import { CustomButton } from './styles';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({ children, type, disabled }: ButtonProps) {
  return (
    <CustomButton variant="contained" type={type} disabled={disabled}>
      {children}
    </CustomButton>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
};
