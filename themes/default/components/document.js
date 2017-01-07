import React from 'react'

const Document = ({ children }) => (
  <html lang='en'>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <title>React Static Site 2</title>
    {children}
  </html>
)

export default Document
