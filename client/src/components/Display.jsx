import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Display() {
  const [filters, setFilters] = useState({ date: '', doctorId: '' });
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
 
    axios.get("http://localhost:5000/book/bokkings").then((res) => {
      setDetails(res.data);
      setFilteredDetails(res.data);  });
  }, []);

  const handleFilter = () => {
    const result = details.filter(detail => {
     
      const doctorMatch = filters.doctorId === '' || detail.doctor === parseInt(filters.doctorId);

     
      const formattedDate = formatDateString(detail.date);
      const dateMatch = filters.date === '' || formattedDate === filters.date;

      return doctorMatch && dateMatch;
    });
    setFilteredDetails(result);
  };

  
  const formatDateString = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); 
    const day = ("0" + dateObj.getDate()).slice(-2); 
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Filter Details</h2>

      {}
      <div style={filtersSectionStyle}>
        <div style={filterItemStyle}>
          <label style={labelStyle}>
            Select Date:
            <input
              type="date"
              onChange={e => {
                const selectedDate = e.target.value;  
                setFilters({ ...filters, date: selectedDate });
              }}
              style={inputStyle}
            />
          </label>
        </div>
        <div style={filterItemStyle}>
          <label style={labelStyle}>
            Enter Doctor ID:
            <input
              type="number"
              placeholder="Enter Doctor ID"
              value={filters.doctorId}
              onChange={e => setFilters({ ...filters, doctorId: e.target.value })}
              style={inputStyle}
            />
          </label>
        </div>
        <button onClick={handleFilter} style={buttonStyle}>Apply Filters</button>
      </div>

      {/* Table Section */}
      <div>
        <table style={tableStyle}>
          <thead>
            <tr style={theadStyle}>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Doctor</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail, index) => (
              <tr key={detail.id} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                <td style={cellStyle}>{detail.name}</td>
                <td style={cellStyle}>{detail.doctor}</td>
                <td style={cellStyle}>${detail.amount}</td>
                <td style={cellStyle}>{detail.date}</td>
                <td style={cellStyle}>{detail.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
  marginTop:'20px'
};

const headerStyle = {
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

const filtersSectionStyle = {
  marginBottom: '20px',
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const filterItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '200px',
};

const labelStyle = {
  fontSize: '16px',
  color: '#555',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '14px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

const theadStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  textAlign: 'left',
};

const cellStyle = {
  padding: '12px 15px',
  border: '1px solid #ddd',
  fontSize: '14px',
  color: '#333',
};

const rowStyleEven = {
  backgroundColor: '#f9f9f9', 
};

const rowStyleOdd = {
  backgroundColor: '#f2f2f2', 
};

export default Display;
