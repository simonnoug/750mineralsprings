import { ReactNode, Children, isValidElement } from 'react';
import styles from './TwoColumnsWrapper.module.css';


type Props = {
  children: ReactNode
  reverseOnMobile?: boolean
  padFirst?: boolean;
  padSecond?: boolean;
};

export default function TwoColumnsWrapper({
  children,
  reverseOnMobile = false,
  padFirst = false,
  padSecond = false,
}: Props) {
  const [first, second] = Children.toArray(children).slice(0, 2)
  const wrapperClasses = [
    styles['two-col'],
    reverseOnMobile && styles['two-col--reverse-mobile'],
  ].filter(Boolean).join(' ');

  const firstClasses = [
    styles['two-col__column'],
    padFirst && styles['two-col__column--padded'],
  ].filter(Boolean).join(' ');

  const secondClasses = [
    styles['two-col__column'],
    padSecond && styles['two-col__column--padded'],
  ].filter(Boolean).join(' ');

  return (
    <main className={wrapperClasses}>
      <div className={firstClasses}>{first}</div>
      <div className={secondClasses}>{second}</div>
    </main>
  )
}
