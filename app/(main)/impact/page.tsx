'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function Impact() {
  // Duolingo green color palette
  const colors = {
    primary: '#58CC02',
    primaryLight: '#89E219',
    primaryDark: '#46A302',
    secondary: '#E5E5E5',
    text: '#3C3C3C',
    textLight: '#777777',
    background: '#FFFFFF',
    cardBg: '#F7F7F7'
  };

  // Data for Civic Awareness Growth
  const awarenessData = [
    { category: 'Rights', before: 68, after: 94 },
    { category: 'Government', before: 45, after: 87 },
    { category: 'Legal', before: 52, after: 91 },
    { category: 'Electoral', before: 41, after: 88 }
  ];

  // Data for Completion Rate
  const completionData = [
    { name: 'Civic Learn', value: 85 },
    { name: 'Traditional', value: 20 },
    { name: 'Other EdTech', value: 35 }
  ];

  // Data for Knowledge Retention
  const retentionData = [
    { time: 'Day 1', gamified: 95, traditional: 90 },
    { time: 'Week 1', gamified: 89, traditional: 65 },
    { time: 'Week 2', gamified: 85, traditional: 45 },
    { time: 'Week 3', gamified: 81, traditional: 32 },
    { time: 'Week 4', gamified: 78, traditional: 25 }
  ];

  // Data for Engagement Metrics (Radar)
  const engagementData = [
    { metric: 'Daily Return', value: 65 },
    { metric: '7-Day Streak', value: 42 },
    { metric: 'AI Chat', value: 64 },
    { metric: 'Quiz Done', value: 85 },
    { metric: 'Satisfaction', value: 94 }
  ];

  // Data for Quiz Accuracy
  const accuracyData = [
    { attempt: '1st', accuracy: 45 },
    { attempt: '2nd', accuracy: 58 },
    { attempt: '3rd', accuracy: 67 },
    { attempt: '4th', accuracy: 75 },
    { attempt: '5th', accuracy: 82 },
    { attempt: 'Final', accuracy: 89 }
  ];

  // Data for Problem Solving Impact
  const impactData = [
    { problem: 'Low Civic Literacy', score: 9.5 },
    { problem: 'Boring Education', score: 9.0 },
    { problem: 'Poor Accessibility', score: 9.8 },
    { problem: 'Legal Ignorance', score: 8.5 },
    { problem: 'Low Voter Turnout', score: 8.8 },
    { problem: 'Youth Disconnect', score: 9.2 }
  ];

  return (
    <div style={{
      fontFamily: "'DIN Round', 'Nunito', 'Arial Rounded MT Bold', sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 20px',
      background: colors.background,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          textAlign: 'center',
          color: colors.text,
          marginBottom: '8px',
          fontSize: '2.5em',
          fontWeight: '800'
        }}>
          Impact Dashboard
        </h1>
        <p style={{
          textAlign: 'center',
          color: colors.textLight,
          fontSize: '1.1em',
          fontWeight: '400'
        }}>
          Track your learning progress
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '48px'
      }}>
        <div style={{
          background: colors.primary,
          padding: '32px',
          borderRadius: '16px',
          textAlign: 'center',
          border: `3px solid ${colors.primaryDark}`,
          boxShadow: '0 4px 0 0 rgba(70, 163, 2, 1)'
        }}>
          <div style={{ 
            fontSize: '3.5em', 
            fontWeight: '800', 
            marginBottom: '8px',
            color: 'white'
          }}>85%</div>
          <div style={{ 
            fontSize: '1.1em',
            color: 'white',
            fontWeight: '700'
          }}>Completion Rate</div>
        </div>
        <div style={{
          background: colors.primary,
          padding: '32px',
          borderRadius: '16px',
          textAlign: 'center',
          border: `3px solid ${colors.primaryDark}`,
          boxShadow: '0 4px 0 0 rgba(70, 163, 2, 1)'
        }}>
          <div style={{ 
            fontSize: '3.5em', 
            fontWeight: '800', 
            marginBottom: '8px',
            color: 'white'
          }}>78%</div>
          <div style={{ 
            fontSize: '1.1em',
            color: 'white',
            fontWeight: '700'
          }}>Knowledge Retention</div>
        </div>
      </div>

      {/* Chart 1: Civic Awareness Growth */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Civic Awareness Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={awarenessData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis 
              dataKey="category" 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
            <Legend wrapperStyle={{ fontWeight: 600 }} />
            <Bar 
              dataKey="before" 
              fill="#E5E5E5" 
              name="Before" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="after" 
              fill={colors.primary} 
              name="After" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Completion Rate Comparison */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Completion Rate Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              dataKey="value"
            >
              <Cell fill={colors.primary} />
              <Cell fill="#E5E5E5" />
              <Cell fill="#C4C4C4" />
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Knowledge Retention Over Time */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Knowledge Retention Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={retentionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
            <Legend wrapperStyle={{ fontWeight: 600 }} />
            <Line
              type="monotone"
              dataKey="gamified"
              stroke={colors.primary}
              strokeWidth={4}
              name="Gamified"
              dot={{ fill: colors.primary, r: 6, strokeWidth: 2, stroke: 'white' }}
            />
            <Line
              type="monotone"
              dataKey="traditional"
              stroke="#C4C4C4"
              strokeWidth={4}
              name="Traditional"
              dot={{ fill: '#C4C4C4', r: 6, strokeWidth: 2, stroke: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 4: User Engagement Metrics */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          User Engagement Metrics
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={engagementData}>
            <PolarGrid stroke="#E5E5E5" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fill: colors.textLight, fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis 
              domain={[0, 100]} 
              tick={{ fill: colors.textLight, fontSize: 10, fontWeight: 600 }}
            />
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke={colors.primary}
              fill={colors.primary}
              fillOpacity={0.3}
              strokeWidth={3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 5: Quiz Accuracy Improvement */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Quiz Accuracy Improvement
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis 
              dataKey="attempt" 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke={colors.primary}
              strokeWidth={4}
              name="Accuracy %"
              dot={{ fill: colors.primary, r: 8, strokeWidth: 3, stroke: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 6: Problem Solving Impact */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: colors.cardBg,
        borderRadius: '16px',
        border: '2px solid #E5E5E5'
      }}>
        <h3 style={{
          fontSize: '1.3em',
          color: colors.text,
          marginBottom: '20px',
          fontWeight: '800'
        }}>
          Problems Solved - Impact Score
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={impactData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis 
              type="number" 
              domain={[0, 10]} 
              tick={{ fill: colors.textLight, fontSize: 12, fontWeight: 600 }}
            />
            <YAxis 
              type="category" 
              dataKey="problem" 
              width={150}
              tick={{ fill: colors.textLight, fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip 
              formatter={(value) => `${value}/10`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '2px solid #E5E5E5',
                fontWeight: 600
              }}
            />
            <Bar 
              dataKey="score" 
              name="Impact Score" 
              fill={colors.primary}
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
