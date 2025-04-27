using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace Shared.Data;

public class CalculatorDbContext : DbContext
{
    public CalculatorDbContext (DbContextOptions<CalculatorDbContext> options) 
        : base(options) {}
    
    public DbSet<CalculationRequest> Calculations { get; set; }
}