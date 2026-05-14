import WorkflowBuilderClient from './WorkflowBuilderClient';

export const metadata = {
  title: 'Workflow Builder | Connexa Services',
  description:
    'Workflow Builder — Constructor visual de flujos de trabajo para Oracle Field Service Cloud. Automatizá procesos OFSC sin escribir código.',
  keywords: ['Oracle Field Service', 'OFSC', 'Workflow Builder', 'Field Service Management', 'automatización OFSC', 'no-code'],
};

export default function WorkflowBuilderPage() {
  return <WorkflowBuilderClient />;
}
