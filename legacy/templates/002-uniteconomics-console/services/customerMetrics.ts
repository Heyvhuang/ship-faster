import { supabase } from './supabaseClient';
import type { Database } from '../supabaseTypes';

type CustomerMetricInsert = Database['public']['Tables']['customer_metrics']['Insert'];

export const fetchCustomerMetrics = async () => {
  const { data, error } = await supabase
    .from('customer_metrics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const insertCustomerMetric = async (metric: CustomerMetricInsert) => {
  const { data, error } = await supabase
    .from('customer_metrics')
    .insert(metric)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
