import React from 'react'

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{display: 'flex', height: '100vh'}}>
        <div style={{flex: 1}}>{children}</div>
        <div style={{flex: 1, backgroundColor: 'lightblue'}}></div>
    </div>
  )
};

export default authLayout