using System;
using System.Collections.Generic;

namespace TimeTracker.Models
{
    public class TaskList : List<Task>
    {
        public int CurrentPage { get; set; } = 0;
        public int ItemsPerPage { get; private set; }

        public bool HasNextPage => CurrentPage + 1 < NumberOfPages;
        public bool HasPrevPage => CurrentPage - 1 > -1;

        public int NumberOfPages
        {
            get
            {
                double val = (double)Count / (double)ItemsPerPage;
                return (int)Math.Ceiling(val);
            }
        }

        public TaskList(int itemsPerPage) : base()
        {
            ItemsPerPage = itemsPerPage;
        }

        public TaskList(int itemsPerPage, int capacity) : base(capacity)
        {
            ItemsPerPage = itemsPerPage;
        }

        public TaskList(int itemsPerPage, IEnumerable<Task> collection) : base(collection)
        {
            ItemsPerPage = itemsPerPage;
        }
    }
}
