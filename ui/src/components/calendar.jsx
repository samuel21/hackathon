import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Button, Form } from "react-bootstrap";
import styled from 'styled-components';
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const localizer = momentLocalizer(moment);


const StyledButton = styled(Button)`
  background-color: #3498db;
  border: none;
  &:hover {
    background-color: #2980b9;
  }
`;

const MyCalendar = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvp, setRsvp] = useState(""); // Tracks RSVP status
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      description: "Discuss project updates and next steps.",
      start: new Date(2024, 8, 16, 10, 0), // September 16, 2024, 10:00 AM
      end: new Date(2024, 8, 16, 12, 0),   // September 16, 2024, 12:00 PM
      rsvp: null,
      type: "meeting",
    },
    {
      id: 2,
      title: "Lunch Break",
      description: "Take a break and enjoy some lunch.",
      start: new Date(2024, 8, 17, 13, 0), // September 17, 2024, 1:00 PM
      end: new Date(2024, 8, 17, 14, 0),   // September 17, 2024, 2:00 PM
      rsvp: null,
      type: "break",
    },
  ]);

  const handleClose = () => {
    setShow(false);
    setRsvp(""); // Reset RSVP status on close
  };

  const handleShow = (event) => {
    setSelectedEvent(event);
    setRsvp(event.rsvp || "");
    setShow(true);
  };

  const handleRsvpChange = (e) => {
    setRsvp(e.target.value);
  };

  const handleRsvpSubmit = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id ? { ...event, rsvp } : event
    );
    setEvents(updatedEvents);
    handleClose();
  };

  // Custom event style handler
  const eventStyleGetter = (event) => {
    const backgroundColor = event.type === "meeting" ? "#3498db" : "#2ecc76";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "8px",
        padding: "3px",
      },
    };
  };

  return (
    <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="week"
          views={["month", "week", "day"]}
          step={60}
          showMultiDayTimes
          selectable
          onSelectEvent={handleShow}
          eventPropGetter={eventStyleGetter}
        />
        
      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedEvent?.description}</p>

          {/* RSVP Form */}
          <Form>
            <Form.Group controlId="rsvpOptions">
              <Form.Label>RSVP to this event</Form.Label>
              <Form.Control as="select" value={rsvp} onChange={handleRsvpChange}>
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <StyledButton onClick={handleRsvpSubmit} disabled={!rsvp}>
            Submit RSVP
          </StyledButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendar;
