export default function Error({message}) {
  return (
    <div style={{backgroundColor: 'red', padding: '10px'}}>
        <p>{message}</p>
    </div>
  );
}