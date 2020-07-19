export type Result = {
  screenshotTaked: boolean;
  pageDownload: boolean;
  warnings: string[];
  errors: string[];
  dateTime: Date;
  finalUrl?: string;
};
