export type PageConfigs = {
  instanceType?: InstanceType;
  plataform?: Plataform;
  headless?: boolean;
  resultPath: string;
};

export type Plataform = 'lambda' | 'other';

export type InstanceType = 'linux' | 'other';
