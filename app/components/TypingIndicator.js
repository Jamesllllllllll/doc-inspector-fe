import './typingIndicator.css';

export default function TypingIndicator({status}) {
  return (
    <div className='grid'>
      <div className='typing-indicator'>
        <span></span>
        <span></span>
        <span></span>
        {(status === 'completed' || status === '') && (<p>Thinking...</p>)}
        {/* Above is state from previous run */}
        {status === 'in_progress' && (<p>Replying...</p>)}
        {status === 'requires_action' && (<p>Modifying document...</p>)}
        
      </div>
    </div>
  );
}
