import { ContentLayout } from '../_layouts';
import { BigFaq } from './ui';

export const Faq: React.FC = () => {
  return (
    <ContentLayout title="F.A.Q" contentTitle="Вопросы и ответы">
      <BigFaq />
    </ContentLayout>
  );
};
