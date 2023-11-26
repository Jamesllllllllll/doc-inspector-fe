import './typingIndicator.css';

export default function TypingIndicator({status}) {
  return (
    <div className='grid'>
      <div className='typing-indicator'>
        <span></span>
        <span></span>
        <span></span>
        {status === 'in_progress' && (<p>Thinking...</p>)}
        {status === 'requires_action' && (<p>Modifying document...</p>)}
        {status === 'completed' && (<p>Done!</p>)}
      </div>
    </div>
  );
}
