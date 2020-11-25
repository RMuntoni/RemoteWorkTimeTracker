using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.Models
{
    public class Task
    {
        [Required]
        public DateTime FinishDate { get; set; }
        [Required]
        public long Duration { get; set; }

        [ReadOnly(true)]
        public TimeSpan TimeSpanDuration => new TimeSpan(Duration*1000);

        [Required]
        public string Description { get; set; }
    }
}
