import Icon from './Icon';

export default function Stars({ size = 20, label = '5 von 5 Sternen' }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <div className="review-stars" {...a11y}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} />
      ))}
    </div>
  );
}
