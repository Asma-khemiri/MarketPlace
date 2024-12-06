import React from 'react'

function Dashboard() {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
    <iframe
        title="Power BI Report"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=2b3fa9e2-114b-4ccb-a8e5-841a7c2c7105&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"

        allowFullScreen="true"
    ></iframe>
</div>
  );
};

export default Dashboard
