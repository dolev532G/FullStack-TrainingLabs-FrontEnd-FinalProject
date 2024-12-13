import React from 'react';
import styles from '../styles';

const UniversalTable = ({ headers, data }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={styles.th}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            {headers.map((header, colIndex) => {
              const cellData = row[header.key];
              return (
                <td key={colIndex} style={styles.td}>
                  {renderCellContent(header.type, cellData)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Helper to render cell content based on type
const renderCellContent = (type, content) => {
  if (type === 'link') {
    return <a href={content.href} style={styles.link}>{content.label}</a>;
  } else if (type === 'nestedTable') {
    return <UniversalTable headers={content.headers} data={content.data} />;
  }
  return content; // Default: text
};

export default UniversalTable;
