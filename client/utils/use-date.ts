import { useMemo } from "react";
import { DateTime } from 'luxon';

export const useDate = ( startDateString, endDateString ) => {


  const getTimeDifference = useMemo(()=>{
    if(!startDateString || !endDateString) return;
    const startDateTime = DateTime.fromISO(startDateString);
    const endDateTime = DateTime.fromISO(endDateString);

    const diff = endDateTime.diff(startDateTime);
    if(diff.as('seconds') <60) {
        return `${diff.as('seconds').toFixed(0)} seconds`;
    }
    else if(diff.as('minutes') <60) {
        return `${diff.as('minutes').toFixed(0)} minute`;
    }
    else if(diff.as('hours') <24) {
      return `${diff.as('hours').toFixed(0)} hour`;
    }
    else if (diff.as('days') < 28) {
      return `${diff.as('days').toFixed(0)} days`;
    } else if (diff.as('months') < 11) {
      return `${diff.as('months').toFixed(0)} month`;
    } else {
      return `${diff.as('years').toFixed(0)} year`;
    }
  },[startDateString , endDateString])

  return getTimeDifference;
};