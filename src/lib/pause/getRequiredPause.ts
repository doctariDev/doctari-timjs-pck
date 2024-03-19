import {TimeReport, timeReportSchema} from "../../schematics/timeReport";
import {MINIMUM_LEGAL_PAUSE_6, MINIMUM_LEGAL_PAUSE_9} from "../../utils/pauseConstants";

/**
 * This function returns the recommended pause based on total worked minutes.
 *
 * @function getRequiredPause
 * @param {TimeReport} timeReport - The actual TimeReport object.
 * @returns {{number | null}} - <b>Number</b> if successful, <b>null</b> otherwise.
 */
export function getRequiredPause(timeReport: TimeReport): number | null {
  try {
    timeReportSchema.validateSync(timeReport); // Synchronous validation
  } catch (err) {
    console.error(err);
    return null;
  }

  const { from, to } = timeReport;
  const fromDate = new Date(from.date + 'T' + from.time);
  const toDate = new Date(to.date + 'T' + to.time);

  const timeDifferenceMs = toDate.getTime() - fromDate.getTime();
  const totalWorkedMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

  if (totalWorkedMinutes < MINIMUM_LEGAL_PAUSE_6.workingTimeInMinutes) {
    return 0; //no pause needed
  }
  if (totalWorkedMinutes >= MINIMUM_LEGAL_PAUSE_6.workingTimeInMinutes && totalWorkedMinutes < MINIMUM_LEGAL_PAUSE_9.workingTimeInMinutes) {
    return MINIMUM_LEGAL_PAUSE_6.pauseInMinutes;
  }
  if (totalWorkedMinutes >= MINIMUM_LEGAL_PAUSE_9.workingTimeInMinutes) {
    return MINIMUM_LEGAL_PAUSE_9.pauseInMinutes;
  }
  return null;
}


getRequiredPause({} as TimeReport);
