import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Page from '@/pages/test_vitest';

test('Page', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: 'Test Vitest' })).toBeDefined();
});
