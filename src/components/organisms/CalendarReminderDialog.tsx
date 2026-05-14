import { useNavigate } from "react-router-dom";
import { SiGooglecalendar } from "react-icons/si";
import { CalendarReminderDialogProps } from "../../domain/models/interfaces/ICalendarReminderDialogProps";

export default function CalendarReminderDialog({
  open,
  onClose,
}: CalendarReminderDialogProps) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <dialog open className="calendar-dialog">
      <div className="dialog-content">
        <div className="dialog-header">
          <SiGooglecalendar className="calendar-icon" />
          <h3>Would you like to receive a reminder in your Google Calendar?</h3>
        </div>

        <div className="dialog-actions">
          <button
            onClick={() => navigate("/calendar-setup")}
            className="confirm-btn"
          >
            Yes
          </button>

          <button onClick={onClose} className="cancel-btn">
            No thanks
          </button>
        </div>
      </div>
    </dialog>
  );
}
