import compose from 'compose-function';
import { withRouter } from '@/pages';
import { withTheme } from '@/feature';

export const withHocs = compose(withRouter, withTheme);
