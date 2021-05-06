using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using MyToDoList.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MyToDoList.Data
{
    public interface IMyToDoListContext
    {
        ChangeTracker ChangeTracker { get; }
      
        DatabaseFacade Database { get; }
       
        IModel Model { get; }
      
        DbContextId ContextId { get; }
        DbSet<ToDoTask> ToDoTask { get; set; }

        EntityEntry Add([NotNullAttribute] object entity);
       
        EntityEntry<TEntity> Add<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
        
        ValueTask<EntityEntry> AddAsync([NotNullAttribute] object entity, CancellationToken cancellationToken = default);
        
        ValueTask<EntityEntry<TEntity>> AddAsync<TEntity>([NotNullAttribute] TEntity entity, CancellationToken cancellationToken = default) where TEntity : class;
      
        void AddRange([NotNullAttribute] params object[] entities);
      
        void AddRange([NotNullAttribute] IEnumerable<object> entities);
       
        Task AddRangeAsync([NotNullAttribute] IEnumerable<object> entities, CancellationToken cancellationToken = default);
      
        Task AddRangeAsync([NotNullAttribute] params object[] entities);
       
        EntityEntry Attach([NotNullAttribute] object entity);
     
        EntityEntry<TEntity> Attach<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
       
        void AttachRange([NotNullAttribute] IEnumerable<object> entities);
      
        void AttachRange([NotNullAttribute] params object[] entities);
       
        void Dispose();
       
        ValueTask DisposeAsync();
       
        EntityEntry Entry([NotNullAttribute] object entity);
       
        EntityEntry<TEntity> Entry<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
        
        TEntity Find<TEntity>(params object[] keyValues) where TEntity : class;
       
        object Find([NotNullAttribute] Type entityType, params object[] keyValues);
        
        ValueTask<object> FindAsync([NotNullAttribute] Type entityType, object[] keyValues, CancellationToken cancellationToken);
       
        ValueTask<object> FindAsync([NotNullAttribute] Type entityType, params object[] keyValues);
        
        ValueTask<TEntity> FindAsync<TEntity>(object[] keyValues, CancellationToken cancellationToken) where TEntity : class;
        
        ValueTask<TEntity> FindAsync<TEntity>(params object[] keyValues) where TEntity : class;
        
        DbQuery<TQuery> Query<TQuery>() where TQuery : class;
       
        EntityEntry Remove([NotNullAttribute] object entity);
       
        EntityEntry<TEntity> Remove<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
       
        void RemoveRange([NotNullAttribute] IEnumerable<object> entities);
      
        void RemoveRange([NotNullAttribute] params object[] entities);
      
        int SaveChanges(bool acceptAllChangesOnSuccess);
       
        int SaveChanges();
        
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default);
        
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
       
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
       
        EntityEntry Update([NotNullAttribute] object entity);
       
        EntityEntry<TEntity> Update<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
       
        void UpdateRange([NotNullAttribute] IEnumerable<object> entities);
       
        void UpdateRange([NotNullAttribute] params object[] entities);
    }
}
