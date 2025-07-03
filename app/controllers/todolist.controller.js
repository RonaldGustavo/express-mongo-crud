const db = require('../models');
const Todolist = db.todolist;

// Helper for API responses
const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({ message, status, data });
};

// Create
exports.create = async (req, res) => {
  try {
    const documents = req.body.map((item) => ({
      user: item.user,
      activity: item.activity,
      description: item.description,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await Todolist.insertMany(documents);
    sendResponse(res, 200, 'Successfully created');
  } catch (error) {
    sendResponse(res, 500, 'Failed to create');
  }
};

// Get All (with Pagination & Search)
exports.findAll = async (req, res) => {
  const { user } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const searchQuery = req.query.search || '';
  const startIndex = (page - 1) * limit;

  try {
    const regexPattern = new RegExp(searchQuery, 'i');
    const stringSearchConditions = [
      { activity: { $regex: regexPattern } },
      { description: { $regex: regexPattern } },
    ];

    const dateSearchConditions = !isNaN(Date.parse(searchQuery))
      ? [
          {
            $or: [
              { created_at: { $gte: new Date(searchQuery) } },
              { updated_at: { $gte: new Date(searchQuery) } },
            ],
          },
        ]
      : [];

    const conditions = {
      $and: [
        { $or: [...stringSearchConditions, ...dateSearchConditions] },
        { user },
      ],
    };

    const totalCount = await Todolist.countDocuments(conditions);
    const tasks = await Todolist.find(conditions)
      .limit(limit)
      .skip(startIndex)
      .exec();

    const result = {
      status: 200,
      pagination: {
        page,
        limit,
        total: totalCount,
        search: searchQuery,
      },
      data: tasks,
    };

    if (tasks.length === 0) {
      result.message = 'No data found.';
    }

    res.status(200).json(result);
  } catch (error) {
    sendResponse(res, 500, 'Error fetching data', error.message);
  }
};

// Get by ID
exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Todolist.findById(id);
    if (!data) {
      return sendResponse(res, 404, 'Task not found');
    }
    res.json(data);
  } catch (error) {
    sendResponse(res, 500, 'Error fetching task', error.message);
  }
};

// Update
exports.update = async (req, res) => {
  const { id } = req.params;
  req.body.updated_at = new Date();

  try {
    const updated = await Todolist.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return sendResponse(res, 404, 'Failed to update: Task not found');
    }
    sendResponse(res, 200, 'Successfully updated');
  } catch (error) {
    sendResponse(res, 500, 'Failed to update', error.message);
  }
};

// Delete
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todolist.findByIdAndDelete(id);
    if (!deleted) {
      return sendResponse(res, 404, 'Failed to delete: Task not found');
    }
    sendResponse(res, 200, 'Successfully deleted');
  } catch (error) {
    sendResponse(res, 500, 'Failed to delete', error.message);
  }
};
