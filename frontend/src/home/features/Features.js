import React from 'react';
import Box from '@mui/material/Box';
import f1 from '../../assets/images/features/f1.png';
import './Features.css';

function Features() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, marginX: 12 }}>
      <Box sx={{display:'flex', width:1, marginTop: 2}}>
          <div className="feature-img width-half">
            <img src={f1} alt="f1" />
          </div>
          <div className='feature-detail width-half'>
          <div className="feature-title">Network Insight</div>
          <div className="feature-text">The Web3 Talent Chain operates as a decentralized network connecting contributors, startups, and validators through a trustless, reputation-driven ecosystem. Contributors join the network using wallet-based authentication and build their reputation by completing verifiable tasks and bounties posted by startups. Each task acts as a temporary hub, where contributors are dynamically matched based on skills and past performance. Validators play a key role in peer-reviewing submissions, ensuring authenticity and reducing manipulation. All reputational data is stored on-chain, making contributor credibility tamper-proof and transparent.</div>
          </div>
      </Box>
      <Box sx={{display:'flex', width:1,  marginTop: 2}}>
          <div className='feature-detail width-half'>
          <div className="feature-title">Network Insight</div>
          <div className="feature-text">The Web3 Talent Chain operates as a decentralized network connecting contributors, startups, and validators through a trustless, reputation-driven ecosystem. Contributors join the network using wallet-based authentication and build their reputation by completing verifiable tasks and bounties posted by startups. Each task acts as a temporary hub, where contributors are dynamically matched based on skills and past performance. Validators play a key role in peer-reviewing submissions, ensuring authenticity and reducing manipulation. All reputational data is stored on-chain, making contributor credibility tamper-proof and transparent.</div>
          </div>
          <div className="feature-img width-half">
            <img src={f1} alt="f1" />
          </div>
      </Box>
          
    </Box>
  );
}

export default Features;
