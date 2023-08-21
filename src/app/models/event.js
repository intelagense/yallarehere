import { mongoose, models } from 'mongoose';

const EventSchema = new mongoose.Schema({
    event_id: { type: String, required: true, unique: true },
    event_name: { type: String, required: true, maxlength: 80 },
    event_description: { type: String, required: false, maxlength: 280 },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    volunteers: [{
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: false },
    }],
});

const Event = models.Event || mongoose.model('Event', EventSchema);

export default Event
