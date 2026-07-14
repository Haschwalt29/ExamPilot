import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #ddd',
          background: '#f8f8f8',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ExamPilot</h1>
      </header>
      <main style={{ padding: '24px' }}>{children}</main>
    </div>
  );
};

export default MainLayout;
