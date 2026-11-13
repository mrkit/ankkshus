import { Router } from 'express';
import { z } from 'zod';
import { Contact } from '../db/models.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const role = z.string().regex(/^[a-z0-9-]{1,48}$/);
const blankToNull = (max) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null)
    .nullable()
    .optional();

const contactFields = z.object({
  name: blankToNull(120),
  phone: blankToNull(40),
  note: blankToNull(500),
});

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  res.json(await Contact.findAll({ order: [['role', 'ASC']] }));
});

// Saves one role's entry. An entry with every field blank is removed.
router.put(
  '/:role',
  requireAuth,
  validateBody(contactFields),
  async (req, res) => {
    const key = role.parse(req.params.role);
    const { name = null, phone = null, note = null } = req.body;
    if (!name && !phone && !note) {
      await Contact.destroy({ where: { role: key } });
      return res.status(204).end();
    }
    const [contact] = await Contact.upsert(
      { role: key, name, phone, note, updatedById: req.user.id },
      { returning: true },
    );
    res.json(contact);
  },
);

export default router;
