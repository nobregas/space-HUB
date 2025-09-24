import React from 'react';
import CheckinDashboard from '../components/CheckIn/CheckinDashboard';
import type { Reservation } from '@/types';

interface CheckinPageProps {
  reservations: Reservation[];
}

const CheckinPage: React.FC<CheckinPageProps> = ({ reservations }) => {
  return <CheckinDashboard reservations={reservations} />;
};

export default CheckinPage;
