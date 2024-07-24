
/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Retrieve a list of staff
 *     description: Retrieve a list of staff from the database.
 *     responses:
 *       200:
 *         description: A list of staff.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Retrieve a single staff member by ID
 *     description: Retrieve a single staff member by ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the staff member to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single staff member.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Insert a new staff member
 *     description: Insert a new staff member into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               designation_id:
 *                 type: integer
 *               training_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully inserted new staff member.
 */


/**
 * @swagger
 * tags:
 *   name: Training
 *   description: API endpoints for training-related operations
 */

/**
 * @swagger
 * /training:
 *   get:
 *     tags:
 *       - Training
 *     summary: Retrieve a list of trainings
 *     description: Retrieves a list of all trainings. You can filter by `external` or `internal` query parameters.
 *     parameters:
 *       - name: external
 *         in: query
 *         description: Filter for external trainings
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *       - name: internal
 *         in: query
 *         description: Filter for internal trainings
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *     responses:
 *       200:
 *         description: A list of trainings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Error retrieving trainings
 */
