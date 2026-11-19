import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactsPage from '@/app/contacts/page';
import { siteConfig } from '@/config/site';

describe('ContactsPage Component', () => {
  it('renders direct contact channels and company phone', () => {
    render(<ContactsPage />);
    expect(screen.getByText(siteConfig.phone)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
    expect(screen.getByText(`@${siteConfig.telegramBot}`)).toBeInTheDocument();
  });

  it('toggles FAQ accordions on click', () => {
    render(<ContactsPage />);
    const faqQuestion = screen.getByText(/Нужно ли штробить стены/i);
    expect(faqQuestion).toBeInTheDocument();

    // Default first question is open
    expect(screen.getByText(/Нет, штробление не требуется/i)).toBeInTheDocument();

    // Click to toggle close
    fireEvent.click(faqQuestion);
    expect(screen.queryByText(/Нет, штробление не требуется/i)).not.toBeInTheDocument();

    // Click to open again
    fireEvent.click(faqQuestion);
    expect(screen.getByText(/Нет, штробление не требуется/i)).toBeInTheDocument();
  });

  it('submits contact form and shows success message', async () => {
    render(<ContactsPage />);
    const nameInput = screen.getByLabelText(/Ваше имя/i);
    const phoneInput = screen.getByLabelText(/Номер телефона/i);
    const submitBtn = screen.getByRole('button', { name: /Получить техническую консультацию/i });

    fireEvent.change(nameInput, { target: { value: 'Дмитрий' } });
    fireEvent.change(phoneInput, { target: { value: '+7 (999) 777-88-99' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Заявка отправлена!/i)).toBeInTheDocument();
    });
  });
});
