const db = require("../config/db");

// Utility function for executing queries
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Function to send consistent API responses
const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

// Fetch posts by category with pagination
exports.getPostsByCategory = (req, res) => {
  const { param1, param2 } = req.params;
  const { page = 1, limit = 10
  } = req.query; // Default page 1, limit 10
  const offset = (page - 1) * limit;

  // Convert slugs back to normal text
  const formattedCategoryType = param1.replace(/-/g, " ");
  const formattedCategoryName = param2.replace(/-/g, " ");

  // Get category_id from categories table
  const categoryQuery = `
    SELECT category_id FROM categories 
    WHERE category_name = ? AND category_type = ? LIMIT 1;
  `;

  db.query(
    categoryQuery,
    [formattedCategoryName, formattedCategoryType],
    (err, categoryResult) => {
      if (err) {
        return sendResponse(
          res,
          500,
          "Error fetching category ID",
          err.message
        );
      }

      if (categoryResult.length === 0) {
        return sendResponse(res, 404, "Category not found", []);
      }

      const categoryId = categoryResult[0].category_id;

      // Query to fetch paginated posts
      const postsQuery = `
                SELECT 
                posts.id,
                posts.title,
                posts.content,
                posts.featured_image,
                posts.blog_type,
                posts.seoTitle,
                posts.seoDescription,
                posts.created_at,
                COALESCE(SUM(post_views.views), 0) AS view_count,  -- Updated view_count calculation
                posts.Custom_url,
                authors.full_name AS author_name,
                COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names,
                COALESCE(JSON_ARRAYAGG(categories.category_type), JSON_ARRAY()) AS category_types
            FROM posts
            LEFT JOIN authors ON posts.author_id = authors.author_id
            LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
            LEFT JOIN post_views ON post_views.post_id = posts.id  -- Join with post_views
            WHERE posts.blog_type = 'published' 
              AND FIND_IN_SET(?, REPLACE(posts.category_id, '"', ''))
            GROUP BY posts.id, authors.full_name, posts.title, posts.content, posts.featured_image, 
                    posts.blog_type, posts.seoTitle, posts.seoDescription, posts.created_at, 
                    posts.Custom_url
            ORDER BY posts.created_at DESC
            LIMIT ? OFFSET ?;
      `;

      db.query(postsQuery, [categoryId, parseInt(limit), parseInt(offset)], (err, postsResult) => {
        if (err) {
          return sendResponse(
            res,
            500,
            "Error fetching posts by category",
            err.message
          );
        }

        // Count total posts for pagination metadata
        const countQuery = `
          SELECT COUNT(*) AS total FROM posts 
          WHERE posts.blog_type = 'published' 
            AND FIND_IN_SET(?, REPLACE(posts.category_id, '"', ''));
        `;

        db.query(countQuery, [categoryId], (err, countResult) => {
          if (err) {
            return sendResponse(res, 500, "Error fetching total posts", err.message);
          }

          const totalPosts = countResult[0].total;
          const totalPages = Math.ceil(totalPosts / limit);

          sendResponse(res, 200, "Posts retrieved successfully", {
            totalPosts,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            data: postsResult
          });
        });
      });
    }
  );
};

