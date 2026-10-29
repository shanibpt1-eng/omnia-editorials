export default function CustomError({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ padding: 40, textAlign: 'center', color: '#fff', background: '#0A0D14' }}>
      <h1>{statusCode ? `Error ${statusCode}` : 'An error occurred'}</h1>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
