import React from 'react';

const HomePage = () => {
  // Sample data - replace with your actual data
  const statistics = {
    totalWaste: "2,450",
    pickups: "168",
    users: "432",
    campaigns: "12"
  };

  const users = [
    { id: 1, name: "John Doe", contact: "+1234567890", status: "Pickup Scheduled" },
    { id: 2, name: "Jane Smith", contact: "+0987654321", status: "Completed" },
    { id: 3, name: "Mike Johnson", contact: "+1122334455", status: "Pending" }
  ];

  const styles = {
    homepage: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000', // Black background
      color: '#fff' // White text for better contrast
    },
    hero: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: '#66bb6a', // Bright green background for hero
      borderRadius: '12px',
      marginBottom: '40px'
    },
    heroTitle: {
      fontSize: '2.5rem',
      color: '#fff',
      marginBottom: '16px'
    },
    heroText: {
      fontSize: '1.2rem',
      color: '#e0e0e0'
    },
    statistics: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    statCard: {
      background: '#1a1a1a', // Dark card background
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    },
    statIcon: {
      fontSize: '2rem',
      marginRight: '16px',
      color: '#9ccc65' // Light bright green for icons
    },
    statLabel: {
      color: '#b3b3b3',
      fontSize: '0.875rem',
      marginBottom: '4px'
    },
    statValue: {
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '0'
    },
    section: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      color: '#fff', // White for section titles
      marginBottom: '20px'
    },
    tableContainer: {
      background: '#1a1a1a', // Dark table background
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '16px',
      textAlign: 'left',
      backgroundColor: '#66bb6a', // Bright green header
      fontWeight: '600',
      color: '#fff', // White text for header
      borderBottom: '1px solid #e2e8f0'
    },
    td: {
      padding: '16px',
      textAlign: 'left',
      borderBottom: '1px solid #e2e8f0',
      color: '#fff' // White text for table data
    },
    statusBadge: (status) => ({
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      backgroundColor: status === 'Completed' ? '#9ccc65' : 
                      status === 'Pending' ? '#feebc8' : '#bee3f8',
      color: status === 'Completed' ? '#004d00' : 
             status === 'Pending' ? '#744210' : '#2a4365'
    })
  };

  return (
    <div style={styles.homepage}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>E-Waste Management Portal</h1>
        <p style={styles.heroText}>Making electronic waste disposal efficient and environmentally friendly</p>
      </section>

      {/* Statistics Cards */}
      <section style={styles.statistics}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div>
            <p style={styles.statLabel}>Total Waste Collected</p>
            <h3 style={styles.statValue}>{statistics.totalWaste} kg</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>🚛</div>
          <div>
            <p style={styles.statLabel}>Pickups Completed</p>
            <h3 style={styles.statValue}>{statistics.pickups}</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <p style={styles.statLabel}>Registered Users</p>
            <h3 style={styles.statValue}>{statistics.users}</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📅</div>
          <div>
            <p style={styles.statLabel}>Active Campaigns</p>
            <h3 style={styles.statValue}>{statistics.campaigns}</h3>
          </div>
        </div>
      </section>

      {/* Users List */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Users</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.contact}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
