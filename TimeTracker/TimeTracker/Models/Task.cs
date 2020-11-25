using System;
using System.ComponentModel.DataAnnotations;

namespace TimeTracker.Models
{
    public class Task
    {
        [Required]
        public DateTime FinishDate { get; set; }
        [Required]
        public long Duration { get; set; }

        public TimeSpan TimeSpanDuration => new TimeSpan(Duration);

        [Required]
        public string Description { get; set; }
    }
}
