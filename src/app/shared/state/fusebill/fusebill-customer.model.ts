import { ID } from '@datorama/akita';

export interface FusebillCustomer {
  id: ID;
  firstName: string,
  middleName: string,
  lastName: string,
  companyName: string,
  suffix: string,
  primaryEmail: string,
  primaryPhone: number,
  secondaryEmail: string,
  secondaryPhone: number,
  title: string,
  reference: number,
  status: string,
  customerAccountStatus: string,
  currency: string,
  customerReference: {
    reference1: null,
    reference2: string,
    reference3: null,
    salesTrackingCodes: [],
    id: number,
    uri: string
  },
  customerAcquisition: {
    adContent: null,
    campaign: null,
    keyword: null,
    landingPage: null,
    medium: null,
    source: null,
    id: number,
    uri: string
  },
  monthlyRecurringRevenue: number,
  netMonthlyRecurringRevenue: number,
  salesforceId: number,
  salesforceAccountType: null,
  salesforceSynchStatus: string,
  netsuiteId: number,
  netsuiteSynchStatus: string,
  netsuiteCustomerType: string,
  portalUserName: string,
  parentId: number,
  quickBooksLatchType: null,
  quickBooksId: null,
  quickBooksSyncToken: null,
  hubSpotId: null,
  hubSpotCompanyId: null,
  modifiedTimestamp: Date,
  createdTimestamp: Date,
  uri: string
}

export function createFusebill(params: Partial<FusebillCustomer>) {
  return {

  } as FusebillCustomer;
}
